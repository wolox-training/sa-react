import { create } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';

import { getSession } from '../services/LocalStorageService';

const deserializer = new CamelcaseSerializer();
const serializer = new SnakecaseSerializer();

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const STATUS_CODES = {
  unauthorized: 401,
  unprocessableEntity: 422,
  internalServerError: 500
};

const api = create({
  baseURL,
  timeout: 60000
});

api.addMonitor((response) => {
  if (response.status === STATUS_CODES.unauthorized) {
    /*
     * TODO: These callbacks should only be called if no other callback was asigned for the response.
     * - dispatch(alertActions.error(i18next.t('apiErrors:expired')));
     */
  }
});

api.addMonitor((response) => {
  // TODO: We should customize the error for each case
  if (
    response.problem === 'NETWORK_ERROR' ||
    (response.config?.url === '/users/show' && response.status === STATUS_CODES.internalServerError)
  ) {
    // TODO
  }
});

api.addResponseTransform((response) => {
  if (response.data) {
    response.data = deserializer.serialize(response.data);
  }
});

api.addRequestTransform((request) => {
  if (request.data) {
    request.data = serializer.serialize(request.data);
  }

  const session = getSession();

  if (session) {
    request.headers.uid = session.uid;
    request.headers.client = session.client;
    request.headers['access-token'] = session.token;
  }
});

export default api;
