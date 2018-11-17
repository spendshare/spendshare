Rails.application.routes.draw do
  match '*path',
    controller: 'application',
    action: 'options',
    via: :options

  namespace 'api' do
    namespace 'v1' do
      post 'sign_in', to: 'sessions#get'
      delete 'sign_out', to: 'sessions#delete'
    end
  end
end
