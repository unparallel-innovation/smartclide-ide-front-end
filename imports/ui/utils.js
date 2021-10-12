import Connector from 'connector-smartclide'

module.exports = {
    checkToken: async function(keycloak){
        if(keycloak.isTokenExpired(30)){
            await keycloak.updateToken(30)
            console.log("Token updated")
        }
    },
    getWorkspaces: async function(keycloak){
        await this.checkToken(keycloak)

        const connector = new Connector()

        const workflows = await connector.getMostRecentWorkflows();
        const services = await connector.getMostRecentServices();
        const deployments = await connector.getMostRecentDeployments();
        const recent = await connector.getRecentWorkspaces(keycloak.idToken, 3)

        return {
            workflows,
            services,
            deployments,
            recent
        }
    },
    getWorkspace: async function(keycloak, workspaceId){
        await this.checkToken(keycloak)

        const connector = new Connector()
        return connector.getWorkspace(keycloak.idToken, workspaceId)
    },
    startWorkspace: async function(keycloak, workspaceId){
        await this.checkToken(keycloak)

        const connector = new Connector()
        await connector.startWorkspace(keycloak.idToken, workspaceId)
    },
    stopWorkspace: async function(keycloak, workspaceId){
        await this.checkToken(keycloak)

        const connector = new Connector()
        await connector.stopWorkspace(keycloak.idToken, workspaceId)
    }
}
