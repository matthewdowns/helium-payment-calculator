import HeliumHttpClient, {
    Network
} from '@helium/http';

const heliumHttpClient = new HeliumHttpClient(Network.production);

export default heliumHttpClient;
