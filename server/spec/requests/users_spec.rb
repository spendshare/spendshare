describe 'user request', type: :request do
  context 'GET /api/v1/users' do
    before do

      get '/api/v1/users'
    end

    it 'returns list of users' do
      expect(JSON.parse(response.body)).to eq('data' => [])
    end

    it 'has status 200' do
      expect(response.status).to eq 200
    end
  end
end
