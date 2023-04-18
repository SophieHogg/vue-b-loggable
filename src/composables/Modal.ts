import { ref, shallowRef } from "vue";
import SignInForm from "../components/SignInForm.vue";
import SignUpForm from "../components/SignUpForm.vue";

const show = ref(false);
const component = shallowRef();
export function useModal() {
    return {
        show,
        component,
        showModal: (type: "signUp" | "signIn") => {
            show.value = true;
            switch (type) {
                case "signIn":
                    return (component.value = SignInForm);
                case "signUp":
                    return (component.value = SignUpForm);
            }
        },
        hideModal: () => (show.value = false),
    };
}
