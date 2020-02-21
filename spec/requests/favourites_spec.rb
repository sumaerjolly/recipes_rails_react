require 'rails_helper'

RSpec.describe 'favourites', type: :request do
	 describe 'GET /favourites' do
    context 'when user isnt logged in' do
      it 'returns http status 500' do
        get '/api/v1/favourites'
        expect(response).to have_http_status(500)
      end
		end

		context 'when a user is logged in' do 
			before {
				@user = User.create(username: "lets", password: "password", password_confirmation: "password")
				@recipe = Recipe.create(
					name: "Recipe 1",
					ingredients: 'testing',
					instruction: 'Testing Insturctions'
				)
				@recipe1 = Recipe.create(
					name: "Recipe 2",
					ingredients: 'tesing 2 ',
					instruction: 'Testing again'
				)
				post '/sessions',params: {
					user: {
            username: "lets" ,
            password: "password"
          }
				}
				@favourite1 = Favourite.create(user_id: @user.id, recipe_id: @recipe.id)
				@favourite2 = Favourite.create(user_id: @user.id, recipe_id: @recipe1.id)
				get '/api/v1/favourites'
			}
			
			it 'returns users favourites' do
        result = JSON.parse(response.body)
        expect(result.length).to eq(2)
			end
			
			it 'returns http status 200' do
        expect(response).to have_http_status(200)
      end
		end
	end

	describe 'POST /favourites' do
		context 'when user isnt logged in' do
			it 'returns http status 500' do
        post '/api/v1/favourites'
        expect(response).to have_http_status(500)
      end
		end

		context 'a user is logged in' do
			before {
				@user = User.create(username: "lets", password: "password", password_confirmation: "password")
				@recipe = Recipe.create(
					name: "Recipe 1",
					ingredients: 'testing',
					instruction: 'Testing Insturctions'
				)
				post '/sessions',params: {
					user: {
            username: "lets" ,
            password: "password"
          }
				}
				post "/api/v1/favourites", params: { username: @user.username, id: @recipe.id }
			}

      it 'returns http status 200' do
        expect(response).to have_http_status(200)
      end

		end
	end	

	describe 'DELETE /favourites' do
		before {
				@user = User.create(username: "lets", password: "password", password_confirmation: "password")
				@recipe = Recipe.create(
					name: "Recipe 1",
					ingredients: 'testing',
					instruction: 'Testing Insturctions'
				)
				@recipe1 = Recipe.create(
					name: "Recipe 2",
					ingredients: 'tesing 2 ',
					instruction: 'Testing again'
				)
				post '/sessions',params: {
					user: {
            username: "lets" ,
            password: "password"
          }
				}
				@favourite1 = Favourite.create(user_id: @user.id, recipe_id: @recipe.id)
				@favourite2 = Favourite.create(user_id: @user.id, recipe_id: @recipe1.id)
				delete "/api/v1/favourites/#{@recipe.id}"
		}

		it "deletes a favourite from the favourites list" do 
			get '/api/v1/favourites'
			result = JSON.parse(response.body)
			expect(result.length).to eq(1)
		end
		
	end
end