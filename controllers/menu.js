const Menu = require("../models/menu");



const addMenu = async (req, res) => {

  const menu = new Menu(req.body);

  await menu.save((err, createdMenu) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!createdMenu) {
        res.status(404).send({ message: "Error al crear el menu." });
      } else {
        res.status(200).send({ message: "Menu creado correctamente.",
     });
      }
    }
  });
}

const getMenus = (req, res) => {
  Menu.find()
    .sort({ order: "asc" })
    .exec((err, menusStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!menusStored) {
          res.status(404).send({
            message: "No se ha encontrado ningun elemento en le menu."
          });
        } else {
          res.status(200).send({ menu: menusStored });
        }
      }
    });
}

const updateMenu = ( req, res ) => {
  let menuData = req.body;
  const params = req.params;

  Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!menuUpdate) {
        res.status(404).send({ message: "No se ha encontrado ningun menu." });
      } else {
        res.status(200).send({ message: "Menu actualizado correctamente." });
      }
    }
  });
}

const activateMenu = (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  Menu.findByIdAndUpdate(id, { active }, (err, menuStored) => {
    if (err) {
      res.status(500).send({ message: "Erro del servidor." });
    } else {
      if (!menuStored) {
        res.status(404).send({ message: "no se ha encontrad el menu." });
      } else {
        if (active === true) {
          res.status(200).send({ message: "Menu activado correctamente." });
        } else {
          res.status(200).send({ message: "Menu desactivado correctamente." });
        }
      }
    }
  });
}

const deleteMenu = (req, res) => {
  const { id } = req.params;

  Menu.findByIdAndRemove(id, (err, menuDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!menuDeleted) {
        res.status(404).send({ message: "Menu no encontrado." });
      } else {
        res
          .status(200)
          .send({ message: "El menu ha sido eliminado correctamente." });
      }
    }
  });
}

module.exports = {
  addMenu,
  getMenus,
  updateMenu,
  activateMenu,
  deleteMenu
};