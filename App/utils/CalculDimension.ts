import { DiemsionType } from "../Store/dimensionsSlice";

export default class CalculDimension {
    constructor(dimension: DiemsionType) {
        this.dimension = dimension;
    }
    dimension: DiemsionType

    getEnergieTotal(): number {
        let appareils = this.dimension.appareils ?? [];
        let energie = 0;
        appareils.forEach(appareil => {
            let aux = appareil.puissance * appareil.nombre * appareil.temps
            energie = energie + aux
            // console.log(`${appareil.nom } ${appareil.nombre}  ${appareil.puissance} ${appareil.temps} p=${aux}`)
        });

        return energie;
    }

    getPuissancePanneau(): number {
        if (this.dimension.ensoleillement) {
            return Math.ceil(this.getEnergieTotal() / (this.dimension.ensoleillement * 0.65))
        }
        return 0
    }

    getTensionSystem() {
        let pv = this.getPuissancePanneau()
        if (pv < 800) {
            return 12;
        } else if (800 < pv && pv < 1600) {
            return 24
        } else {
            return 48
        }
    }

    getPanneauSerie(): number {
        if (this.dimension.tension_panneau) {
            return this.getTensionSystem() / (this.dimension.tension_panneau)
        }
        return 1;
    }
    getPanneauParallele(): number {
        if (this.dimension.puissance_panneau) {
            return Math.ceil(this.getPuissancePanneau() / (this.dimension.puissance_panneau * this.getPanneauSerie()));
        }
        return 1;
    }
    getTotalPanneau() {
        return this.getPanneauParallele() * this.getPanneauSerie();
    }
    getBatterieCapacite() : number {
        if (this.dimension.autonomie && this.dimension.dod ) {
            let not_rounded = Math.floor(this.getEnergieTotal() * this.dimension.autonomie)/ (this.dimension.dod * this.getTensionSystem())
            let rounde = Math.ceil(not_rounded)
            if(rounde % 2 == 0){
                return rounde;
            }else{
                let aux = rounde / 2;
                return (Number.parseInt(aux.toString())*2) + 2
            }
        }
        return 1
      
    }
    getBatterieSerie() : number{
        if(this.dimension.tension_batterie) return this.getTensionSystem()/(this.dimension?.tension_batterie);
        return 1
    }

    getBatterieParallele() : number{
        if(this.dimension.capacite_batterie) return Math.ceil(this.getBatterieCapacite()/(this.dimension?.capacite_batterie));
        return 1
    }

    getTotalBatterie() : number {
        return this.getBatterieParallele() * this.getBatterieSerie()
    }

    getICC(): number {
        return this.getPuissancePanneau() / this.getTensionSystem()
    }

    getPuissanceTotalDC() : number {
        let appareils = this.dimension.appareils?.filter(ap=>ap.tension == 'DC')??[];
        let puissanceApps = 0
        appareils.forEach(app=>{
            puissanceApps = puissanceApps + (app.puissance * app.nombre);
        })
        return puissanceApps;
    }

    getPuissanceTotalAC() : number {
        let appareils = this.dimension.appareils?.filter(ap=>ap.tension == 'AC')??[];
        let puissanceApps = 0
        appareils.forEach(app=>{
            puissanceApps = puissanceApps + (app.puissance * app.nombre);
        })
        return puissanceApps;
    }

    getPuissanceTotal() : number { let puissanceApps = 0
        this.dimension.appareils?.forEach(app=>{
            puissanceApps = puissanceApps + (app.puissance * app.nombre);
        })
        return puissanceApps;
    }
    getCourantRegulateur() : number {
        let formul1 = 1.5 * this.getICC();
        let formul2 = this.getPuissanceTotalDC() / this.getTensionSystem();
        let courant = Math.max(formul1,formul2);
        if(courant % 10 == 0){
            return courant;
        }else{
            let aux = courant/10;
            return (Number.parseInt(aux.toString())*10) + 10
        }
    }

    getPuissanceConvertisseur() : number {
        let appareils = this.dimension.appareils?.filter(app=>app.tension == 'AC')??[]
        let puissance = 0;
        appareils.forEach(element => {
            puissance += element.puissance* element.nombre
        });
        puissance *= 1.25;
        if(puissance % 500 == 0){
            return puissance;
        }else{
            let aux = puissance / 500;
            return (Number.parseInt(aux.toString())*500) + 500
        }
    }

    getSectionPanneauRegulateur(){
        let longueurCable = 10;
        let chutTension = 0.02
        return (2 *longueurCable * this.getICC() * (1.7 * Math.pow(10,-8)))/ (chutTension* this.getTensionSystem())
    }

    getSectionRegulateurBatt(){
        let longueurCable = 4;
        let chutTension = 0.02
        return (2 *longueurCable * this.getICC() * (1.7 * Math.pow(10,-8)))/ (chutTension* this.getTensionSystem())
    }

    getSectionBattConvertisseur(){
        let longueurCable = 5;
        let chutTension = 0.02
        let iAdmissible = this.getPuissanceConvertisseur()/this.getTensionSystem()

        return (2 *longueurCable * iAdmissible * (1.7 * Math.pow(10,-8)))/ (chutTension* this.getTensionSystem())
    }
    


} 