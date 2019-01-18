import { get, param, HttpErrors } from '@loopback/rest';

const k8s = require('@kubernetes/client-node');

// load default configuration from .kube/config file
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sAppsV1Api = kc.makeApiClient(k8s.Apps_v1Api);

export class K8sAppsV1ApiController {
  constructor() { }

  @get('/listDeploymentForAllNamespaces')
  async listDeploymentForAllNamespaces(): Promise<Object> {
    try {
      let result = await k8sAppsV1Api.listDeploymentForAllNamespaces();

      let deployments: String[] = [];

      result.response.body.items.forEach(function (item: any) {
        console.log('Deployment name: ' + item.metadata.name);

        deployments.push(item.metadata.name);
      });

      return deployments;
    } catch (error) {
      throw error;
    }
  }
}
