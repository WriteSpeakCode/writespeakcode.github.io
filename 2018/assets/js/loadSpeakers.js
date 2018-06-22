const LOCAL_DATA_URL = './assets/speakers-data.json';
const REMOTE_DATA_URL = 'https://gist.githubusercontent.com/courte/4899ecb6eb8ce0d7e0bedca3a2e7ff0c/raw/2c5b7b34a5230c0d148f8a9f46b9cfbc9ffc8524/data.json';

getData = (url) => {
    var data;

    $.ajax({
        'async': false,
        'global': false,
        'url': url,
        'dataType': "json",
        'success': function (response) {
            data = response;
        },
        'error': function (err) {
            data = null;
        }
    });

    return data;
}

getSpeakerData = () => {
    const speakers = [];

    for (url of [LOCAL_DATA_URL]) { //, REMOTE_DATA_URL]) {
        if (speakers.length == 0) {
            data = getData(url);
             console.log('the data for url', url, 'is', data);
            if (data && data.speakers) {
                return data.speakers;
            }
        }
    }

    return speakers;
}

createSpeakerIdString = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
}

linkTwitter = (username) => {
    if (username) {
        return `<li><a href="http://twitter.com/${username}" target="_blank" rel="noopener" class="tips" title="TWITTER"><i class="icon-twitter icon"></i></a></li>`
    }
    return '';
}

linkLinkedin = (alias) => {
    if (alias) {
        return `<li><a href="https://www.linkedin.com/in/${alias}" target="_blank" rel="noopener" class="tips" title="LINKEDIN"><i class="icon-linkedin icon"></i></a></li>`
    }
    return '';
}

linkGithub = (username) => {
    if (username) {
        return `<li><a href="http://github.com/${username}" class="tips" target="_blank" rel="noopener" title="GITHUB"><i class="icon-github icon"></i></a></li>`
    }
    return '';
}

createNameBlock = (name, title, company) => {
    let occupation;

    if (title && company) {
        occupation = `${title}, ${company}`;
    }
    else if (title || company) {
        occupation = `${title || company}`;
    }
    else {
        occupation = '';
    }

    return `
    <h4>${name}</h4>
    <h5>${occupation}</h5>
    `;
}

createSpeakerTile = (speakerId, nameBlock, name, headshot_filename) => {
    const imgFile = headshot_filename || `${speakerId}.jpg`;

    return `<li class="gridder-list" data-griddercontent="#${speakerId}">
        <img src="./assets/img/speakers/${imgFile}" alt="${name} headshot" nopin="nopin">
        <div class="name-title">
            ${nameBlock}
        </div>
    </li>`;
}

createSpeakerBioDiv = (speakerId, nameBlock, speakerObj) => {
    const {
        twitter,
        linkedin,
        github,
        bio
    } = speakerObj;

    return `<div id="${speakerId}" class="gridder-content">
    <div class="row between-lg middle-sm">
      <div class="col-xs-12 col-sm-3">
        ${nameBlock}
        <ul class="spkr-social clearfix">
          ${linkTwitter(twitter)}
          ${linkLinkedin(linkedin)}
          ${linkGithub(github)}
        </ul>
      </div>
      <div class="col-xs-12 col-sm-9 col-lg-8">
        <p>${bio}</p>
      </div>
    </div>
  </div>`
}

createSpeakerElements = (speaker) => {
    // console.log("speaker_data:", speaker);
    const {
        name,
        job_title,
        company,
        headshot_filename
    } = speaker;
    const speakerId = createSpeakerIdString(name);
    const nameBlock = createNameBlock(name, job_title, company);

    // console.log("headshot_filename:", imgFilename)
    const tile = createSpeakerTile(speakerId, nameBlock, name, headshot_filename);
    const bio = createSpeakerBioDiv(speakerId, nameBlock, speaker);
    return [tile, bio]
}

loadSpeakers = () => {
    const speakerData = getSpeakerData();
    // console.log("the speaker data is:", speakerData);

    var speakerTileItems = "";
    var speakerBioItems = "";

    for (speaker of speakerData) {
        [tile, bio] = createSpeakerElements(speaker);
        speakerTileItems += tile;
        speakerBioItems += bio;
    }

    $("#speaker-grid-list").html(speakerTileItems);
    $("#speakers").append(speakerBioItems);
}

$(document).ready(function() {
    loadSpeakers();
});
