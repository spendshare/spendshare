# describe 'user request', type: :request do
#   context 'GET /api/v1/users' do
#     before do
#       get '/api/v1/users'
#     end

#     context 'with no users' do
#       it 'returns empty list' do
#         expect(JSON.parse(response.body)).to eq('data' => [])
#       end

#       it 'has status 200' do
#         expect(response.status).to eq 200
#       end
#     end

#     context 'with users' do
#       before :all do
#         create_list(:user, 10)
#       end

#       it 'returns list of users' do
#         expect(JSON.parse(response.body)['data'].size).to eq 10
#       end

#       it 'has status 200' do
#         expect(response.status).to eq 200
#       end
#     end
#   end
# end
