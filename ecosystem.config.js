module.exports = {
  apps : [{
    name: 'qlhd_hnn',
    script: 'index.js',
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    exec_mode: 'cluster',
    watch: true,
    env:{
      NODE_ENV:'production'
    }
  }],

  deploy : {
    production : {
      user : 'admin_hh',
      host : '103.88.121.45',
      ref  : 'origin/main',
      repo : 'git@gitlab.honeynet.vn:63379/outsourcing-projects/qlhd_hnn.git',
      path : '/home/admin_hh/qlhd_hnn/server',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
