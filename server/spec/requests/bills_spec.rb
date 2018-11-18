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

    it 'returns result' do
    end

    it 'has status 200' do
      expect(response.status).to eq 200
    end
  end
end
