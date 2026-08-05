import toast from "react-hot-toast";

export const customToast = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        background: "#0B132B",
        color: "#FFFFFF",
        border: "1px solid #D4AF37", 
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      style: {
        background: "#1A0808",
        color: "#FFD1D1",
        border: "1px solid #EF4444",
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: "#0B132B",
        color: "#D4AF37",
        border: "1px solid rgba(212, 175, 55, 0.4)",
      },
    });
  },
};
