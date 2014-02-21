#RAKE
require 'rubygems'
require 'rake'
require 'yaml'
require 'time'

SOURCE = '.'
CONFIG = {
  "posts" => File.join(SOURCE, "_posts"),
  "drafts" => File.join(SOURCE, "_drafts"),
  "format" => "markdown",
  "config" => "_config.yml", 
  "url" => "http://prakhar.me",
  "dev" => "http://localhost:4000"
}

desc "Create a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: #{CONFIG['posts']} directory not found") unless FileTest.directory?(CONFIG["posts"])
  title = ENV["title"] || "new-post"
  tags = ENV["tags"] || "[rant]"
  category = ENV["category"] || "articles"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')

  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD!"
    exit -1
  end

  filename = File.join(CONFIG["posts"], "#{date}-#{slug}.#{CONFIG['format']}")

  if File.exist?(filename)
    abort("rake aborted!")
  end

  puts "Creating a new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: #{title}"
    post.puts "description: Add some desc here"
    post.puts "category: #{category}"
    post.puts "tags: #{tags}"
    post.puts "---"
  end
end

desc "Create a new draft in #{CONFIG['drafts']}"
task :draft do
  abort("rake aborted: #{CONFIG['posts']} directory not found") unless FileTest.directory?(CONFIG["posts"])
  title = ENV["title"] || "new-draft"
  tags = ENV["tags"] || "[rant]"
  category = ENV["category"] || "articles"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')

  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD!"
    exit -1
  end

  filename = File.join(CONFIG["drafts"], "#{date}-#{slug}.#{CONFIG['format']}")

  if File.exist?(filename)
    abort("rake aborted!")
  end

  puts "Creating a new draft: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: #{title}"
    post.puts "description: Add some desc here"
    post.puts "category: #{category}"
    post.puts "tags: #{tags}"
    post.puts "---"
  end
end

desc "Push to github"
task :publish do
  commit_message = ENV["message"] || ENV["m"] || abort("Please provide a commit message")

  filename = File.join(CONFIG["config"])
  if !File.exist?(filename) 
    abort("config file not found!")
  end
  config = YAML.load_file(filename)
  abort("Please change the URL to #{CONFIG['url']} before publishing ") unless config["url"] == CONFIG["url"]

  system "git add ."
  system "git commit -am '#{commit_message}'"
  system "git push -u origin master"
end

desc "Live Preview (use mode=drafts for drafts)"
task :preview do
  filename = File.join(CONFIG["config"])
  if !File.exist?(filename) 
    abort("config file not found!")
  end
  drafts = ENV["mode"] || ""
  config_yaml = YAML.load_file(filename)
  abort("Please change the URL to #{CONFIG['dev']} before previewing ") unless config_yaml["url"] == CONFIG["dev"]
  system "jekyll serve -w --#{drafts}"
end

desc "List tasks" 
task :default do 
  system('rake -T')
end
