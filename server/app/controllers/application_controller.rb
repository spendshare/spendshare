class ApplicationController < ActionController::API
  after_action :set_cors

  def ok(data = nil)
    if data.nil?
      render nothing: true
      return
    end

    render json: { data: data }
  end

  def error(status = 500, message = '')
    render status: status, json: { error: message }
  end

  def set_cors
    response.set_header(
      'Access-Control-Allow-Origin',
      'http://localhost:8000'
    )
  end

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

  def recognize_token
    authorization = request.headers['Authorization']
    return error(400, 'No Authorization header present') if !authorization

    token = authorization[/(?<=bearer ).*/]
    return error(400, 'Incorrect Authorization token. Did you prepend it with \'bearer \'?') if !token

    token
  end

  def authenticate
    present = Token.find_by(token: recognize_token)

    if present
      return error(400, 'Token expired') if present.valid_until < Time.now
      return ok()
    else
      return error(400, 'Unrecognized token')
    end
  end

  def find_by_global_id(global_id)
    type, id = Base64.decode64(global_id).split(':')
    Object.const_get(type).find(id)
  end
end
