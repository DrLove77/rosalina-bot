var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js')),
    images = require(path.join(__dirname, 'images.js'));

var T = new Twit(config);

function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image(images){
  console.log('Opening an image...');
  var random_image = random_from_array(images),
      image_path = path.join(__dirname, '/images/' + random_image.file ),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('Now tweeting it...');

      var tweet_text = random_image.source //([
          
        //]) + ' Source: ' + random_image.source; 

      T.post('statuses/update', {
        /* You can include text with your image as well. */            
        // status: 'New picture!', 
        /* Or you can pick random text from an array. */            
        status: tweet_text,
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
			console.log(random_image.file);
          }
        }
      );
    }
  });
}

upload_random_image(images);
