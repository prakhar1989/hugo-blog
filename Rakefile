require 'rubygems'
require 'rake'
require 'yaml'
require 'time'

SOURCE = '.'
CONFIG = {
  "posts" => File.join(SOURCE, "_posts"),
  "format" => "markdown"
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
  puts filename
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?")
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

desc "Live Preview"
task :preview do
  system 'jekyll serve -w'
end

desc "Show Usage!" 
task :usage do 
  puts "Lists tasks with rake -T"
  puts "1. new post: rake post title='A Title' [date='2012-02-09'] [tags=[tag1,tag2]] [category='category']"
  puts "2. preview"
end

task :default => :usage
