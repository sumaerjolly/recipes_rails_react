require 'rails_helper'

RSpec.describe Favourite, type: :model do
	describe 'validations checking' do
		it 'ensures that a user can add a recipe to favourites only once' do
			@user = User.create(username: "microverse", password: "password", password_confirmation: "password")
			@recipe = Recipe.new(name: "test name", ingredients: "testing ingredient", instruction: "testing again")
			@favourite = Favourite.create(user: @user, recipe: @recipe)
			@favourite2 = Favourite.new(user: @user, recipe: @recipe)
			expect(@favourite2.save).to eq(false)
		end 
	end	
	
end
