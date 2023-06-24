import { refs } from "./refs/refs";


const mobileMenuToggler = () => {
    refs.mobileViewMenu.classList.toggle('open-menu')
    refs.body.classList.toggle('is-fixed')
}
refs.jsOpenMenu.addEventListener("click", mobileMenuToggler)
refs.jsCloseMenu.addEventListener('click', mobileMenuToggler)