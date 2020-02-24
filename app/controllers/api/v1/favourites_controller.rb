class Api::V1::FavouritesController < ApplicationController
  include CurrentUserConcern
  
  def index
    if @current_user 
      favourites = @current_user.recipes
      render json: favourites
    else 
      render json: {message: "You need to be signed in"}, status: 500
    end
  end

  def create
    if @current_user
      favourite = @current_user.favourites.build(recipe_id: params[:id])
      if favourite.save
        render json: favourite
      else
        render json: favourite.errors 
      end
    else
      render json: {message: "You need to be signed in"}, status: 500
    end
  end

  def destroy
    if @current_user
      favourite = @current_user.favourites.find_by(recipe_id: params[:id])
      if favourite
        favourite.destroy
        render json: { message: 'Removed from favourites' }
      else
        render json: {message:'There was an error' }
      end
    else 
      render json: {message: "You need to be signed in"}, status: 500
    end
  end
end
