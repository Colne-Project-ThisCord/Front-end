import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, instance } from "../../core/axios/axios";
import sweetAlert from "../../core/utils/sweetAlert";

//채팅방 목록조회
export const __getRooms = createAsyncThunk(
  "getRooms",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURL.get("/api/rooms");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      sweetAlert(1000, "error", error.response.data.msg);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postRooms = createAsyncThunk(
  "postRooms",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const data = await baseURL.post("/api/rooms");
      if (data.request.status === 200) {
        sweetAlert(1000, "success", "채팅방 생성 성공");
      }
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      sweetAlert(1000, "error", error.response.data.msg);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailRooms = createAsyncThunk(
  "getDetailRooms",
  async (payload, thunkAPI) => {
    try {
      const data = await baseURL.get(`/api/rooms/${payload}`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      sweetAlert(1000, "error", error.response.data.msg);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  roomId: "",
  chatRoom: [
    {
      roomId: "",
      roomName: "",
      rommPic: "",
    },
  ],
  chat: [],
  users: [
    {
      memberId: 0,
      nickName: "",
    },
  ],
  isLoading: false,
  error: null,
  isSuccess: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getRooms.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(__getRooms.fulfilled, (state, action) => {
      state.chatRoom = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(__getRooms.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSuccess = false;
    });
    builder.addCase(__getDetailRooms.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(__getDetailRooms.fulfilled, (state, action) => {
      state.chat = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(__getDetailRooms.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    });
    builder.addCase(__postRooms.fulfilled, (state, action) => {
      state.chatRoom.push(action.payload);
      state.isLoading = false;
      state.isSuccess = true;
    });
  },
});
// export const {  } = postSlice.actions;

const postReducer = chatSlice.reducer;

export default postReducer;