var gulp = require('gulp');
const exec = require('child_process').exec;
const CronJob = require('cron').CronJob;

gulp.task('default', function() {

  try{
    new CronJob('00 */5 * * * *', function() {

      exec('./runSpeedTest.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });

    }, null, true, 'America/New_York');
  }catch(ex){
    console.log(ex)
  }

});
