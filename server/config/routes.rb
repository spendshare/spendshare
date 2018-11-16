Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      post 'sign_in', to: 'sessions#get'
    end
  end
end
