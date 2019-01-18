import { get, param, HttpErrors } from '@loopback/rest';

const k8s = require('@kubernetes/client-node');

// load default configuration from .kube/config file
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sCoreV1Api = kc.makeApiClient(k8s.Core_v1Api);

export class K8sCoreV1ApiController {
  constructor() { }

  @get('/listNamespace')
  async listNamespace(@param.query.boolean('pretty') pretty = true): Promise<Object> {
    try {
      let result = await k8sCoreV1Api.listNamespace(pretty);

      let namespaces: String[] = [];

      result.response.body.items.forEach(function (item: any) {
        console.log('Deployment name: ' + item.metadata.name);

        namespaces.push(item.metadata.name);
      });

      return namespaces;
    } catch (error) {
      throw error;
    }
  }

  @get('/listNamespacedPod')
  async listNamespacedPod(
    @param.query.string('namespace') namespace = 'default',
    @param.query.boolean('pretty') pretty = true): Promise<Object> {
    try {
      let result = await k8sCoreV1Api.listNamespacedPod(namespace, pretty);

      let namespaces: String[] = [];

      result.response.body.items.forEach(function (item: any) {
        console.log('Deployment name: ' + item.metadata.name);

        namespaces.push(item.metadata.name);
      });

      return namespaces;
    } catch (error) {
      throw error;
    }
  }
}
