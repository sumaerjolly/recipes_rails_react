class Favourite < ApplicationRecord
  validates_uniqueness_of :recipe, scope: :user
  belongs_to :user
  belongs_to :recipe
end
