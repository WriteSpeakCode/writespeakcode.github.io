###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
require 'lib/conference_helper'
require 'lib/blog_helper'

helpers do
  include ConferenceHelper
  include BlogHelper

  # sponsors
  def sponsor_levels
    levels = {
      platinum: 1,
      gold: 2,
      silver: 3,
      bronze: 4,
      childcare: 5,
      host: 6
    }
  end

  def level_to_num(level)
    levels[level.to_sym] || 5
  end

  def sponsors_for(filter, level)
    data.sponsors.select do |k,v|
      v.sponsoring.include?(filter) && v.sponsor_level == level.to_s
    end
  end

  def time_converter(hour, minutes)
    result = ""
    minutes = "00" if minutes == 0
    if hour > 12
      result += "#{hour-12}:#{minutes}pm"
    elsif hour == 12
      result += "#{hour}:#{minutes}pm"
    else
      result += "#{hour}:#{minutes}am"
    end
    result
  end

  def person_comparator(p, sorts)
    comparator = p.name
    comparator = p.type + comparator if sorts[:by_type]
    comparator = (p.weight || '') + comparator if sorts[:by_weight]
    comparator
  end

  def people_filtered_and_sorted(d, filter, sorts)
    d.people.select { |k, v|
      v.pages.include?(filter)
    }.sort_by { |k, v|
      person_comparator(v, sorts)
    }.tap { |data| return data.reverse if sorts[:reverse] }
  end

  def conference_button_links
    links = %w(speakers schedule scholarships childcare)
    links.map! do |link|
      { url: "/conference/#{link}", text: link.titleize }
    end

    links.last[:text] = "Childcare &amp; Accessibility"
    links
  end
end


###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

activate :directory_indexes
page "/2013/*", directory_index: false

# add blog functionality
activate :blog do |blog|
  blog.paginate = true
  blog.prefix = "blog"
  blog.layout = "blog_layout"
  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"
end

page "/feed.xml", layout: false

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

#Bower support
sprockets.append_path File.join root, 'bower_components'
sprockets.import_asset 'jquery'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end

activate :alias
