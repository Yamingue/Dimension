import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Appareil {
  id: number
  nom: string;
  puissance: number;
  tension: "AC" | "DC";
  temps: number;
  nombre: number;
}

export interface DiemsionType {
  id?: number;
  nom?: string;
  appareils?: Appareil[];
  created_at?: string | any;
  sans_batterie?: boolean,
  ensoleillement?: number;
  autonomie?: number; // exprimer en jour
  dod?: number;
  tension_panneau?: number;
  puissance_panneau?: number;
  tension_batterie?: number;
  capacite_batterie?: number;

}

interface UpdateDimension {
  id: number,
  appareil: Appareil
}

const initialState: DiemsionType[] = []

export const dimensionsSlice = createSlice({
  name: 'dimensions',
  initialState,
  reducers: {
    addDimension(state, action: PayloadAction<DiemsionType>) {
      action.payload.appareils = []
      state.push(action.payload)
      return state;
    },
    removeDimension(state, action: PayloadAction<number>) {
      return state.filter(el => el.id != action.payload)
    },
    updateDimension(state, action: PayloadAction<DiemsionType>){
       let dimensions = state.filter(e=>e.id != action.payload.id)
       let newDims = [...dimensions,action.payload];
       state = newDims
       return state;
    },
    addAppareil(state, action: PayloadAction<UpdateDimension>) {
      let dim = state.find(el => el.id == action.payload.id)
      // dim?.appareils?.push(action.payload.appareil)
      state.map(el => {
        if (el.id == action.payload.id) {
          el.appareils?.push(action.payload.appareil)
        }
      });
      return state
    },
    removeAppareil(state, action: PayloadAction<UpdateDimension>) {
      state.map(el => {
        if (el.id == action.payload.id) {
          let devices = el.appareils?.filter(dev=>dev.id != action.payload.appareil.id)
          el.appareils = devices
        }
      });

      return state
    }

  },
})

// Action creators are generated for each case reducer function
export const { addDimension, removeDimension, addAppareil, removeAppareil, updateDimension } = dimensionsSlice.actions

export default dimensionsSlice.reducer