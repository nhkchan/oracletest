module.exports = {
  user          : process.env.NODE_ORACLEDB_USER || "KECOOTA",

  // Instead of hard coding the password, consider prompting for it,
  // passing it in an environment variable via process.env, or using
  // External Authentication.
  password      : process.env.NODE_ORACLEDB_PASSWORD || "Summ3R$2017",

  // For information on connection strings see:
  // https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings
  connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = lahemwait01)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = IT724)))",

  // Setting externalAuth is optional.  It defaults to false.  See:
  // https://oracle.github.io/node-oracledb/doc/api.html#extauth
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};