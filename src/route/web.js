const userRoutes = require("../route/user");
const doctorRoutes = require("../route/doctor");
const allCodesRoutes = require('../route/allcodes')
const patientRoutes = require('../route/patient')
const specialtyRoutes = require('../route/specialty')
const clinicRoutes = require('../route/clinic')

const initWebRoutes = (app) => {
    userRoutes(app)
    allCodesRoutes(app)
    doctorRoutes(app)
    patientRoutes(app)
    specialtyRoutes(app)
    clinicRoutes(app)

}

module.exports = initWebRoutes;