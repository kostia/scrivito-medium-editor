require File.expand_path('../lib/scrivito_medium_editor/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = 'scrivito-medium-editor'
  s.version     = ScrivitoMediumEditor::VERSION

  s.authors     = ['Scrivito']
  s.email       = ['support@scrivito.com']
  s.homepage    = 'https://scrivito.com'

  s.summary     = 'MediumEditor for Scrivito'
  s.description = 'This gem integrates the WYSIWYG JavaScript editor MediumEditor in Scrivito UI'
  s.license     = 'LGPL-3.0'

  s.files = Dir['{app,lib,vendor}/**/*', 'LICENSE', 'Rakefile']

  s.add_dependency 'bundler'
  s.add_dependency 'scrivito'

  s.add_development_dependency 'rake'
end
