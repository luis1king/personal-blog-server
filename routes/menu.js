const express = require("express");
const {getMenus, addMenu, updateMenu, activateMenu, deleteMenu} = require("../controllers/menu");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = express.Router();

router.get("/get-menus", getMenus);
router.post("/add-menu",validarJWT, addMenu);
router.put("/update-menu/:id",validarJWT, updateMenu);
router.put("/activate-menu/:id",validarJWT,activateMenu);
router.delete("/delete-menu/:id",validarJWT, deleteMenu);

module.exports = router;