import request = require('request');
import promise = require('bluebird');
import http = require('http');

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

/* tslint:disable:no-unused-variable */

export class BlockchainInfo {
    /**
    * Current height of the blockchain.
    */
    "height": number;
    /**
    * Hash of the last block in the blockchain.
    */
    "currentBlockHash": string;
    /**
    * Hash of the previous block in the blockchain.
    */
    "previousBlockHash": string;
}

export class Block {
    /**
    * Creator/originator of the block.
    */
    "proposerID": string;
    /**
    * Time of block creation.
    */
    "timestamp": Timestamp;
    "transactions": Array<Transaction>;
    /**
    * Global state hash after executing all transactions in the block.
    */
    "stateHash": string;
    /**
    * Hash of the previous block in the blockchain.
    */
    "previousBlockHash": string;
    /**
    * Metadata required for consensus.
    */
    "consensusMetadata": string;
    /**
    * Data stored in the block, but excluded from the computation of block hash.
    */
    "nonHashData": string;
}

export class Transaction {
    /**
    * Transaction type.
    */
    "type": Transaction.TypeEnum;
    /**
    * Chaincode identifier as bytes.
    */
    "chaincodeID": string;
    /**
    * Payload supplied for Chaincode function execution.
    */
    "payload": string;
    /**
    * Unique transaction identifier.
    */
    "uuid": string;
    /**
    * Time at which the chanincode becomes executable.
    */
    "timestamp": Timestamp;
    /**
    * Confidentiality level of the Chaincode.
    */
    "confidentialityLevel": ConfidentialityLevel;
    /**
    * Nonce value generated for this transaction.
    */
    "nonce": string;
    /**
    * Certificate of client sending the transaction.
    */
    "cert": string;
    /**
    * Signature of client sending the transaction.
    */
    "signature": string;
}

export namespace Transaction {
    export enum TypeEnum { 
        UNDEFINED = <any> 'UNDEFINED',
        CHAINCODE_NEW = <any> 'CHAINCODE_NEW',
        CHAINCODE_UPDATE = <any> 'CHAINCODE_UPDATE',
        CHAINCODE_EXECUTE = <any> 'CHAINCODE_EXECUTE',
        CHAINCODE_QUERY = <any> 'CHAINCODE_QUERY',
        CHAINCODE_TERMINATE = <any> 'CHAINCODE_TERMINATE'
    }
}
export class ChaincodeID {
    /**
    * Chaincode location in the file system. This value is required by the deploy transaction.
    */
    "path": string;
    /**
    * Chaincode name identifier. This value is required by the invoke and query transactions.
    */
    "name": string;
}

export class ChaincodeSpec {
    /**
    * Chaincode specification language.
    */
    "type": ChaincodeSpec.TypeEnum;
    /**
    * Unique Chaincode identifier.
    */
    "chaincodeID": ChaincodeID;
    /**
    * Specific function to execute within the Chaincode.
    */
    "ctorMsg": ChaincodeInput;
    /**
    * Username when security is enabled.
    */
    "secureContext": string;
    /**
    * Confidentiality level of the Chaincode.
    */
    "confidentialityLevel": ConfidentialityLevel;
}

export namespace ChaincodeSpec {
    export enum TypeEnum { 
        UNDEFINED = <any> 'UNDEFINED',
        GOLANG = <any> 'GOLANG',
        NODE = <any> 'NODE'
    }
}
export class ChaincodeInvocationSpec {
    /**
    * Chaincode specification message.
    */
    "chaincodeSpec": ChaincodeSpec;
}

/**
* Confidentiality level of the Chaincode.
*/
export class ConfidentialityLevel {
}

export class ChaincodeInput {
    /**
    * Function to execute within the Chaincode.
    */
    "function": string;
    /**
    * Arguments supplied to the Chaincode function.
    */
    "args": Array<string>;
}

export class Secret {
    /**
    * User enrollment id registered with the certificate authority.
    */
    "enrollId": string;
    /**
    * User enrollment password registered with the certificate authority.
    */
    "enrollSecret": string;
}

export class PeersMessage {
    "peers": Array<PeerEndpoint>;
}

export class PeerEndpoint {
    /**
    * Unique peer identifier.
    */
    "iD": PeerID;
    /**
    * ipaddress:port combination identifying a network peer.
    */
    "address": string;
    /**
    * Network peer type.
    */
    "type": PeerEndpoint.TypeEnum;
    /**
    * PKI identifier for the network peer.
    */
    "pkiID": string;
}

export namespace PeerEndpoint {
    export enum TypeEnum { 
        UNDEFINED = <any> 'UNDEFINED',
        VALIDATOR = <any> 'VALIDATOR',
        NON_VALIDATOR = <any> 'NON_VALIDATOR'
    }
}
export class PeerID {
    /**
    * Name which uniquely identifies a network peer.
    */
    "name": string;
}

export class Error {
    /**
    * A descriptive message explaining the cause of error.
    */
    "error": string;
}

export class OK {
    /**
    * A descriptive message confirming a successful request.
    */
    "oK": string;
    /**
    * An optional parameter containing additional information about the request.
    */
    "message": string;
}


interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: request.Options): void;
}

class HttpBasicAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(requestOptions: request.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

class ApiKeyAuth implements Authentication {
    public apiKey: string;

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: request.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header") {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

class OAuth implements Authentication {
    public accessToken: string;

    applyToRequest(requestOptions: request.Options): void {
        requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
    }
}

class VoidAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(requestOptions: request.Options): void {
        // Do nothing
    }
}

export class TransactionsApi {
    protected basePath = 'http://127.0.0.1:3000';
    protected defaultHeaders : any = {};



    public authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                objA[key] = objB[key];
            }
        }
        return <T1&T2>objA;
    }
    /**
     * Individual transaction contents
     * The /transactions/{UUID} endpoint returns the transaction matching the specified UUID.
     * @param UUID Transaction to retrieve from the blockchain.
     */
    public getTransaction (UUID: string) : Promise<{ response: http.ClientResponse; body: Transaction;  }> {
        const path = this.basePath + '/transactions/{UUID}'
            .replace('{' + 'UUID' + '}', String(UUID));
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'UUID' is set
        if (!UUID) {
            throw new Error('Missing required parameter UUID when calling getTransaction');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: Transaction;  }>();

        let requestOptions: request.Options = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
}
export class RegistrarApi {
    protected basePath = 'http://127.0.0.1:3000';
    protected defaultHeaders : any = {};



    public authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                objA[key] = objB[key];
            }
        }
        return <T1&T2>objA;
    }
    /**
     * Register a user with the certificate authority
     * The /registrar endpoint receives requests to register a user with the certificate authority. The request must supply the registration id and password within the payload. If the registration is successful, the required transaction certificates are received and stored locally. Otherwise, an error is displayed alongside with a reason for the failure.
     * @param secret User enrollment credentials
     */
    public registerUser (secret: Secret) : Promise<{ response: http.ClientResponse; body: OK;  }> {
        const path = this.basePath + '/registrar';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'secret' is set
        if (!secret) {
            throw new Error('Missing required parameter secret when calling registerUser');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: OK;  }>();

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
            body: secret,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
    /**
     * Confirm the user has registered with the certificate authority
     * The /registrar/{enrollmentID} endpoint confirms whether the specified user has registered with the certificate authority. If the user has registered, a confirmation message will be returned. Otherwise, an authorization failure will result.
     * @param enrollmentID Username for which registration is to be confirmed
     */
    public getUserRegistration (enrollmentID: string) : Promise<{ response: http.ClientResponse; body: OK;  }> {
        const path = this.basePath + '/registrar/{enrollmentID}'
            .replace('{' + 'enrollmentID' + '}', String(enrollmentID));
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'enrollmentID' is set
        if (!enrollmentID) {
            throw new Error('Missing required parameter enrollmentID when calling getUserRegistration');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: OK;  }>();

        let requestOptions: request.Options = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
    /**
     * Delete user login tokens from local storage
     * The /registrar/{enrollmentID} endpoint deletes any existing client login tokens from local storage. After the completion of this request, the target user will no longer be able to execute transactions.
     * @param enrollmentID Username for which login tokens are to be deleted
     */
    public deleteUserRegistration (enrollmentID: string) : Promise<{ response: http.ClientResponse; body: OK;  }> {
        const path = this.basePath + '/registrar/{enrollmentID}'
            .replace('{' + 'enrollmentID' + '}', String(enrollmentID));
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'enrollmentID' is set
        if (!enrollmentID) {
            throw new Error('Missing required parameter enrollmentID when calling deleteUserRegistration');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: OK;  }>();

        let requestOptions: request.Options = {
            method: 'DELETE',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
    /**
     * Retrieve user enrollment certificate
     * The /registrar/{enrollmentID}/ecert endpoint retrieves the enrollment certificate for a given user that has registered with the certificate authority. If the user has registered, a confirmation message will be returned containing the URL-encoded enrollment certificate. Otherwise, an error will result.
     * @param enrollmentID EnrollmentID for which the certificate is requested
     */
    public getUserEnrollmentCertificate (enrollmentID: string) : Promise<{ response: http.ClientResponse; body: OK;  }> {
        const path = this.basePath + '/registrar/{enrollmentID}/ecert'
            .replace('{' + 'enrollmentID' + '}', String(enrollmentID));
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'enrollmentID' is set
        if (!enrollmentID) {
            throw new Error('Missing required parameter enrollmentID when calling getUserEnrollmentCertificate');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: OK;  }>();

        let requestOptions: request.Options = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
}
export class BlockchainApi {
    protected basePath = 'http://127.0.0.1:3000';
    protected defaultHeaders : any = {};



    public authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                objA[key] = objB[key];
            }
        }
        return <T1&T2>objA;
    }
    /**
     * Blockchain information
     * The Chain endpoint returns information about the current state of the blockchain such as the height, the current block hash, and the previous block hash.
     */
    public getChain () : Promise<{ response: http.ClientResponse; body: BlockchainInfo;  }> {
        const path = this.basePath + '/chain';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: BlockchainInfo;  }>();

        let requestOptions: request.Options = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
}
export class NetworkApi {
    protected basePath = 'http://127.0.0.1:3000';
    protected defaultHeaders : any = {};



    public authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                objA[key] = objB[key];
            }
        }
        return <T1&T2>objA;
    }
    /**
     * List of network peers
     * The /network/peers endpoint returns a list of all existing network connections for the target peer node. The list includes both validating and non-validating peers.
     */
    public getPeers () : Promise<{ response: http.ClientResponse; body: PeersMessage;  }> {
        const path = this.basePath + '/network/peers';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: PeersMessage;  }>();

        let requestOptions: request.Options = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
}
export class BlockApi {
    protected basePath = 'http://127.0.0.1:3000';
    protected defaultHeaders : any = {};



    public authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                objA[key] = objB[key];
            }
        }
        return <T1&T2>objA;
    }
    /**
     * Individual block information
     * The {Block} endpoint returns information about a specific block within the Blockchain. Note that the genesis block is block zero.
     * @param block Block number to retrieve
     */
    public getBlock (block: number) : Promise<{ response: http.ClientResponse; body: Block;  }> {
        const path = this.basePath + '/chain/blocks/{Block}'
            .replace('{' + 'Block' + '}', String(block));
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'block' is set
        if (!block) {
            throw new Error('Missing required parameter block when calling getBlock');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: Block;  }>();

        let requestOptions: request.Options = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
}
export class DevopsApi {
    protected basePath = 'http://127.0.0.1:3000';
    protected defaultHeaders : any = {};



    public authentications = {
        'default': <Authentication>new VoidAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                objA[key] = objB[key];
            }
        }
        return <T1&T2>objA;
    }
    /**
     * Service endpoint for deploying Chaincode
     * The /devops/deploy endpoint receives Chaincode deployment requests. The Chaincode and the required entities are first packaged into a container and subsequently deployed to the blockchain. If the Chaincode build and deployment are successful, a confirmation message is returned. Otherwise, an error is displayed alongside with a reason for the failure.
     * @param chaincodeSpec Chaincode specification message
     */
    public chaincodeDeploy (chaincodeSpec: ChaincodeSpec) : Promise<{ response: http.ClientResponse; body: OK;  }> {
        const path = this.basePath + '/devops/deploy';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'chaincodeSpec' is set
        if (!chaincodeSpec) {
            throw new Error('Missing required parameter chaincodeSpec when calling chaincodeDeploy');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: OK;  }>();

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
            body: chaincodeSpec,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
    /**
     * Service endpoint for invoking Chaincode functions
     * The /devops/invoke endpoint receives requests for invoking functions in deployed Chaincodes. If the Chaincode function is invoked sucessfully, a transaction id is returned. Otherwise, an error is displayed alongside with a reason for the failure.
     * @param chaincodeInvocationSpec Chaincode invocation message
     */
    public chaincodeInvoke (chaincodeInvocationSpec: ChaincodeInvocationSpec) : Promise<{ response: http.ClientResponse; body: OK;  }> {
        const path = this.basePath + '/devops/invoke';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'chaincodeInvocationSpec' is set
        if (!chaincodeInvocationSpec) {
            throw new Error('Missing required parameter chaincodeInvocationSpec when calling chaincodeInvoke');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: OK;  }>();

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
            body: chaincodeInvocationSpec,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
    /**
     * Service endpoint for querying Chaincode state
     * The /devops/query endpoint receives requests to query Chaincode state. The request triggers a query method on the target Chaincode, both identified in the required payload. If the query method is successful, the response defined within the method is returned. Otherwise, an error is displayed alongside with a reason for the failure.
     * @param chaincodeInvocationSpec Chaincode invocation message
     */
    public chaincodeQuery (chaincodeInvocationSpec: ChaincodeInvocationSpec) : Promise<{ response: http.ClientResponse; body: OK;  }> {
        const path = this.basePath + '/devops/query';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'chaincodeInvocationSpec' is set
        if (!chaincodeInvocationSpec) {
            throw new Error('Missing required parameter chaincodeInvocationSpec when calling chaincodeQuery');
        }

        let useFormData = false;

        let deferred = promise.defer<{ response: http.ClientResponse; body: OK;  }>();

        let requestOptions: request.Options = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: path,
            json: true,
            body: chaincodeInvocationSpec,
        }

        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        request(requestOptions, (error, response, body) => {
            if (error) {
                deferred.reject(error);
            } else {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });

        return deferred.promise;
    }
}