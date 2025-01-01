
import config from "../config"

import { userModel } from "../module/user/user.model"
import { USER_ROLE } from "../module/user/user.constant"

const superUser = {
    id: '0001',
    email: 'alokdas1dd@gamil.com',
    password: `${config.super_admin_password}`,
    needsPasswordChange: false,
    role: USER_ROLE.superAdmin,
    status: 'in-progress',
    isDeleted: false

}


const seedSuperAdmin = async () => {

    const isSuperAdminExists = await userModel.findOne({ role: USER_ROLE.superAdmin });

    if (!isSuperAdminExists) {
        await userModel.create(superUser);
    }

}

export default seedSuperAdmin;