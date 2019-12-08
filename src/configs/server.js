const servers = {
  local: {
    admin: 'http://localhost:3000',
  },
  production: {
    admin: '//server.closertb.site/client',
  },
};

const getServers = () => servers[process.env.NODE_ENV];

export default getServers;
