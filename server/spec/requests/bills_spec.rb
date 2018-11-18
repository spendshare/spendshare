require 'spec_helper'

describe 'bill request', type: :request do
  before do
    @users = create_list(:user, 3)

    @params = {
      'payer' => @users.first.global_id,
      'title' => 'Za kebsa',
      'amount' => 60,
      'participants' => @users.map(&:global_id),
    }

    @result = {
      'data' => {
        'participants' => @users.map do |u|
          {
            'id' => u.global_id,
            'name' => u.name,
            'email' => u.email,
            'balance' => u.balance,
            'owes' => [{
              'amount' => 20,
              'to' => @users.first.global_id,
            }]
          }
        end
      }
    }
    @result['data']['participants'][0]['owes'] = []
  end

  context 'POST /api/v1/bill' do
    before do
      post '/api/v1/bill', params: @params
    end

    # it 'returns list of participants with updated balances' do
    #   expect(JSON.parse(response.body)).to eq(@result)
    # end

    # it 'has status 200' do
    #   expect(response.status).to eq 200
    # end
  end
end
