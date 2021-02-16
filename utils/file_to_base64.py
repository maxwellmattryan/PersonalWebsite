# NOTE: This script was used for encoding the SSL certificate files to base64
# so they could be used as environment variables for TypeORM configuration.

import base64
import os

SSL_CA_PATH = '../conf/ssl/api-service/server-ca.pem'
SSL_CERT_PATH = '../conf/ssl/api-service/client-cert.pem'
SSL_KEY_PATH = '../conf/ssl/api-service/client-key.pem'

def to_base_64(filepath: str) -> str:
    script_dir = os.path.dirname(__file__)
    path = os.path.join(script_dir, filepath) 

    in_file = open(path, 'rb')
    data = in_file.read()
    in_file.close()

    encoded = base64.b64encode(data)

    print(f"Encoding for \"{path}\":")
    print(f"{encoded.decode('utf-8')}\n")

    return encoded

def main():
    ssl_ca = to_base_64(SSL_CA_PATH)
    ssl_cert = to_base_64(SSL_CERT_PATH)
    ssl_key = to_base_64(SSL_KEY_PATH)

if __name__ == '__main__':
    main()
