const certificates = '/home/node/certificates';

const https = {
	key: `${certificates}/localhost-key.pem`,
	cert: `${certificates}/localhost-cert.pem`,
};

module.exports = {
	https,
};
