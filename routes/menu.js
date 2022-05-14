const express = require("express");
const MenuController = require("../controllers/menu");
const { validarJWT } = require("../middlewares/validar-jwt");



const router = express.Router();


router.get("/get-menus", MenuController.getMenus);
router.post("/add-menu",validarJWT, MenuController.addMenu);
router.put("/update-menu/:id",validarJWT, MenuController.updateMenu);
router.put("/activate-menu/:id",validarJWT,MenuController.activateMenu);
router.delete("/delete-menu/:id",validarJWT, MenuController.deleteMenu);

module.exports = router;