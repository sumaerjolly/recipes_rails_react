require 'rails_helper'

RSpec.describe 'Recipes', type: :request do
  before do
    @recipe = Recipe.create(
      name: 'Recipe 1',
      ingredients: 'testing',
      instruction: 'Testing Insturctions'
    )
    @recipe1 = Recipe.create(
      name: 'Recipe 2',
      ingredients: 'tesing 2 ',
      instruction: 'Testing again'
    )

    @recipe2 = Recipe.create(
      name: 'Recipe 3',
      ingredients: 'tesing 3 ',
      instruction: 'Testing 3 again'
    )
  end

  describe 'GET/recipes' do
    before { get '/api/v1/recipes' }

    it 'returns all recipes as a json object' do
      result = JSON.parse(response.body)
      expect(result.length).to eq(3)
    end

    it 'returns http status 200' do
      expect(response).to have_http_status(200)
    end
  end
end
