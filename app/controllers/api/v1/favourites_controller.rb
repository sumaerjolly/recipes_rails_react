class Api::V1::FavouritesController < ApplicationController
  include CurrentUserConcern
  
  def index
    favourites = @current_user.favourites
    render json: favourites
  end

  def create
    favourite = @current_user.favourites.build(recipe_id: params[:id])
    if favourite
      render json: favourite
    else
      render json: favourite.errors
    end
  end

  def destroy
    favourite = @current_user.favourites.find_by(recipe_id: params[:id])
  end
end
