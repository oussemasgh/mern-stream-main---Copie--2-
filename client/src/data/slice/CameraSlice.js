import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const initialState = {
  cameras: [],
  camera: null,
  loading: false,
  error: null,
};

export const fetchCameras = createAsyncThunk("cameras/fetchCameras", async () => {
  try {
    const response = await axiosInstance.get('/cameras/');
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const fetchCameraById = createAsyncThunk("cameras/fetchCameraById", async (id) => {
  try {
    const response = await axiosInstance.get(`/cameras/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const createCamera = createAsyncThunk("cameras/createCamera", async (cameraData) => {
  try {
    const response = await axiosInstance.post('/cameras', cameraData);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const updateCamera = createAsyncThunk("cameras/updateCamera", async ({ id, cameraData }) => {
  try {
    const response = await axiosInstance.put(`/cameras/${id}`, cameraData);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const deleteCamera = createAsyncThunk("cameras/deleteCamera", async (id) => {
  try {
    await axiosInstance.delete(`/cameras/${id}`);
    return id;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const cameraSlice = createSlice({
  name: "cameras",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.loading = false;
        state.cameras = action.payload;
      })
      .addCase(fetchCameras.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCameraById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCameraById.fulfilled, (state, action) => {
        state.loading = false;
        state.camera = action.payload;
      })
      .addCase(fetchCameraById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCamera.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCamera.fulfilled, (state, action) => {
        state.loading = false;
        state.cameras.push(action.payload);
      })
      .addCase(createCamera.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCamera.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCamera.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cameras.findIndex((camera) => camera._id === action.payload._id);
        if (index !== -1) {
          state.cameras[index] = action.payload;
        }
      })
      .addCase(updateCamera.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCamera.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCamera.fulfilled, (state, action) => {
        state.loading = false;
        state.cameras = state.cameras.filter((camera) => camera._id !== action.payload);
      })
      .addCase(deleteCamera.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors } = cameraSlice.actions;

export default cameraSlice.reducer;
