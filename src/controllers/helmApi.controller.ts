import { get, post, put, del, param, requestBody, HttpErrors } from '@loopback/rest';

const helmjs = require('helm-js');

// set helm binary configuration
const helm = helmjs.helm({ binary: '/usr/local/bin/helm' });

// Helm API implementation
export class HelmApiController {
  @del('/delete', {
    description: 'Given a release name, delete the release from Kubernetes',
    responses: {
      '200': {
        description: 'Release deleted',
        content: {
          'application/json': {
            schema: { type: 'string' }
          }
        }
      }
    }
  })
  async delete(
    @param({ name: 'release', description: 'Release flags', in: 'query', required: true }) release?: String,
    @param({ name: 'flags', description: 'Command flags', in: 'query' }) flags?: String
  ): Promise<Object> {
    try {
      return await helm.delete(flags, release);
    } catch (error) {
      throw new HttpErrors.UnorderedCollection(error.message);
    }
  }

  @get('/get', {
    description: 'Download a named release',
    responses: {
      '200': {
        description: 'Releases data downloaded',
        content: {
          'application/json': {
            schema: { type: 'string' }
          }
        }
      }
    }
  })
  async get(
    @param({ name: 'release', description: 'Release name', in: 'query', required: true }) release?: String,
    @param({ name: 'flags', description: 'Command flags', in: 'query' }) flags?: String
  ): Promise<Object> {
    try {
      return await helm.get(flags, release);
    } catch (error) {
      throw new HttpErrors.UnorderedCollection(error.message);
    }
  }

  @post('/install', {
    description: 'Install a chart archive',
    responses: {
      '200': {
        description: 'Chart installed',
        content: {
          'application/json': {
            schema: { type: 'string' }
          }
        }
      }
    }
  })
  async install(
    @param({ name: 'chart', description: 'Chart name', in: 'query', required: true }) chart?: String,
    @param({ name: 'flags', description: 'Command flags', in: 'query' }) flags?: String
  ): Promise<Object> {
    try {
      return await helm.install(flags, chart);
    } catch (error) {
      throw new HttpErrors.UnorderedCollection(error.message);
    }
  }

  @get('/list')
  async list(
    @param({ name: 'flags', description: 'Command flags', in: 'query' }) flags?: String,
    @param({ name: 'filter', description: 'Command filter', in: 'query' }) filter?: String
  ): Promise<Object> {
    try {
      return { response: await helm.list(flags, filter) };
    } catch (error) {
      throw new HttpErrors.UnorderedCollection(error.message);
    }
  }

  @get('/status', {
    description: 'Displays the status of the named release',
    responses: {
      '200': {
        description: 'Release status',
        content: {
          'application/json': {
            schema: { type: 'string' }
          }
        }
      }
    }
  })
  async status(
    @param({ name: 'release', description: 'Release name', in: 'query', required: true }) release?: String,
    @param({ name: 'flags', description: 'Command flags', in: 'query' }) flags?: String,
  ): Promise<Object> {
    try {
      return await helm.status(flags, release);
    } catch (error) {
      throw new HttpErrors.UnorderedCollection(error.message);
    }
  }

  @put('/upgrade', {
    description: 'Upgrade a release',
    responses: {
      '200': {
        description: 'Release status',
        content: {
          'application/json': {
            schema: { type: 'string' }
          }
        }
      }
    }
  })
  async upgrade(
    @param({ name: 'release', description: 'Release name', in: 'query', required: true }) release?: String,
    @param({ name: 'chart', description: 'Chart name', in: 'query', required: true }) chart?: String,
    @param({ name: 'flags', description: 'Command flags', in: 'query' }) flags?: String,
  ): Promise<Object> {
    try {
      return await helm.upgrade(release, chart, flags);
    } catch (error) {
      throw new HttpErrors.UnorderedCollection(error.message);
    }
  }

  @get('/version', {
    description: 'Print the client/server version information',
    responses: {
      '200': {
        description: 'Helm client/server version information',
        content: {
          'application/json': {
            schema: { type: 'string' }
          }
        }
      }
    }
  })
  async version(
    @param({ name: 'flags', description: 'Command flags', in: 'query' }) flags?: String
  ): Promise<Object> {
    try {
      return await helm.version(flags);
    } catch (error) {
      throw new HttpErrors.UnorderedCollection(error.message);
    }
  }
}
