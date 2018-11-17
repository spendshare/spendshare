class ApplicationController < ActionController::API
  after_action :set_cors

  def ok(data = {})
    render json: data
  end

  def error(status = 500, message = '')
    render status: status, json: { error: message }
  end

  def set_cors
    response.set_header('Access-Control-Allow-Origin', 'http://localhost:8000')
  end

  def options
    response.set_header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.set_header('Access-Control-Allow-Methods', 'GET,POST')
    render nothing: true, status: 200
  end
end
