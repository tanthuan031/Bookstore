import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    showClass: {
        popup: "animate__animated animate__fadeInRight",
    },
    hideClass: {
        popup: "animate__animated animate__fadeOutRight",
    },
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});
