# server

## Install

```bash
gem install bundler
bundle install
rake db:create
rake db:migrate
```

## CORS

CORS handling is defined in `routes.rb` via:
```ruby
match '*path',
  controller: 'application',
  action: 'options',
  via: :options
```

and handled in `application_controller.rb` via:

```ruby
def options
  response.set_header(
    'Access-Control-Allow-Headers',
    'Content-Type,Authorization'
  )
  response.set_header(
    'Access-Control-Allow-Methods',
    'GET,POST,DELETE'
  )
  render nothing: true, status: 200
end
```

As you can see, all legal headers and methods are set there.
