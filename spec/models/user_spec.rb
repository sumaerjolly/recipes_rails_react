require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations checking' do
		it 'ensures presence of a username' do 
			@user1 = User.new(username: "")
			expect(@user1.save).to eq(false)
		end

		it 'ensures presence of a username' do 
			@user2 = User.new(username: "testing")
			expect(@user2.save).to eq(true)
		end

		it 'ensure uniqueness of username' do 
			@user = User.create(username: "unique")
			@user3 = User.new(username: "unique")
			expect(@user3.save).to eq(false)
		end

		it 'the uniqueness isnt case sensitivie' do 
			@test = User.create(username: "ram")
			@test1 = User.new(username: "RAM")
			expect(@test1.save).to eq(false)
		end
	end
end
