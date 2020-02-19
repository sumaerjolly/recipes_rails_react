require 'rails_helper'

RSpec.describe Recipe, type: :model do
  describe 'validations checking' do
		it 'ensures presence of a name' do 
			@recipe = Recipe.new(name: "", ingredients: "testing", instruction: "testing again")
			expect(@recipe.save).to eq(false)
		end
		it 'ensures presence of ingredients' do 
			@recipe1 = Recipe.new(name: "wohoo", ingredients: "", instruction: "testing again")
			expect(@recipe1.save).to eq(false)
		end

		it 'ensures presence of instrutction' do 
			@recipe2 = Recipe.new(name: "wohoo", ingredients: "testing", instruction: "")
			expect(@recipe2.save).to eq(false)
		end
	end
end
