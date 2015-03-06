module ConferenceHelper
  def schedule_for_weekday(weekday)
    items = data.schedule[weekday] || []
    items.map { |item| OpenStruct.new(item) }
  end

  def all_speakers
    data.people.select { |k,v| v['pages'].try(:include?, 'speaker') }
  end

  def speaker_link(slug, info)
    link_to(info['name'], "/conference/speakers##{slug}")
  end

  def day_facilitators_links(day)
    data.schedule.facilitators[day].map do |f| 
      speaker_link(f, data.people[f])
    end
  end

  def speakers_for_talk(talk, day)
    speakers = all_speakers.inject([]) do |r, e|
      if e.last['talks'].try(:include?, talk.talk_id)
        r << speaker_link(e.first, e.last)
      end
      r
    end
  end

  def talk_speakers_tag(talk, day)
    speakers = speakers_for_talk(talk, day)
    tag = ''

    unless speakers.nil?
      speakers.push('<em>more!</em>') if talk.more
      tag = speakers.to_sentence

      if talk.moderator
        moderator_info = data.people[talk.moderator]
        tag = "#{tag}<br>Moderated by #{speaker_link(talk.moderator, moderator_info)}"
      end

      tag = "<h5 class='speakers'>#{tag}</h5>"
    end

    tag.html_safe
  end

  def talks_for_speaker(talk_list, slug, person)
    talks_info = talk_list.select do |t|
      person.talks.try(:include?, t.talk_id) ||
        t.moderator == slug
    end

    data.schedule.facilitators.select{ |day, names| names.include?(slug) }.each do |day, names|
      talks_info << OpenStruct.new(talk_name: "#{day.titleize} Day Facilitator", talk_id: day)
    end

    talks_info
  end
end
