require 'spec_helper'

describe 'bill request', type: :request do
  before do
    @params = {
      'group' => 'R3JvdXA6MQ==',
      'payer' => 'VXNlcjox',
      'title' => 'Za kebsa',
      'amount' => 120,
      'participants' => ['VXNlcjoy', 'VXNlcjoz', 'VXNlcjo0'],
    }
  end

  context 'POST /api/v1/bill' do
    before do
      post '/api/v1/bill', params: @params
    end

    it 'returns list of participants with updated balances' do
      expect(JSON.parse(response.body)).to eq(
        'data' => {
          'participants' => [{
            'id' => 'VXNlcjoy',
            'balance' => 100,
          }, {
            'id' => 'VXNlcjoz',
            'balance' => 100,
          }, {
            'id' => 'VXNlcjo0',
            'balance' => 100,
          }]
        }
      )
    end

    it 'has status 200' do
      expect(response.status).to eq 200
    end
  end
end
