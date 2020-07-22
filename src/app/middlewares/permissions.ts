import { NextFunction, Request, Response } from 'express'

class PermissionMiddleware {
  public check (method: string, restricted: Array<{ method: string, permissions: string[]}>) {
    return async (req: any, res: Response, next: NextFunction) => {
      try {
        const objRestricted = restricted.find(obj => obj.method === method)

        if (objRestricted) {
          const restrictedPermissions = objRestricted.permissions
          const payloadPermissions = req.payload.permissions

          for (const restrictedPermission of restrictedPermissions) {
            const match = payloadPermissions.find((permissionObj: { name: string }) => {
              const payloadPermission = permissionObj.name

              if (restrictedPermission.search('::') !== -1) {
                const restrictedTypeFilter =
                  restrictedPermission.substring(restrictedPermission.search('::') + 2, restrictedPermission.length)
                const restrictedPermissionName =
                  restrictedPermission.substring(0, restrictedPermission.search('::'))

                const payloadTypeFilter =
                  payloadPermission.substring(payloadPermission.search('::') + 2, payloadPermission.length)
                const payloadPermissionName =
                  payloadPermission.substring(0, payloadPermission.search('::'))

                if (
                  restrictedPermissionName === payloadPermissionName &&
                  restrictedTypeFilter === payloadTypeFilter
                ) {
                  return permissionObj
                }

                if (
                  restrictedPermissionName === payloadPermissionName &&
                  restrictedTypeFilter === 'mine' &&
                  payloadTypeFilter === 'all'
                ) {
                  return permissionObj
                }
              } else {
                return payloadPermission === restrictedPermission
              }
            })

            if (!match) {
              return res.status(400).json({ error: 'Not authorized' })
            }
          }

          return next()
        } else {
          return res.status(400).json({ error: 'Method not exists' })
        }
      } catch (error) {
        return res.status(500).json({ error: 'Server internal error' })
      }
    }
  }
}

export default new PermissionMiddleware()
