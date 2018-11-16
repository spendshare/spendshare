class ApplicationController < ActionController::API
  after_action :set_cors

  def ok(data)
    render json: data
  end

  def error(status, message)
    render status: status, json: { error: message }
  end

  def set_cors
    response.set_header('Access-Control-Allow-Origin', 'http://localhost:8000')
  end
end
