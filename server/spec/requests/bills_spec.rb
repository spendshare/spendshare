require 'spec_helper'

describe 'bill request', type: :request do
  before do
    @params = {
      'group' => {

      },
      'payer' => {
        'balance' => 20,
        'email' => 'example@gmail.com',
      },
    }
  end

  context 'POST /api/v1/bill' do
    before do
      # post '/api/v1/bill'
    end
  end
end
